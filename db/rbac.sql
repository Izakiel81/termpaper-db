-- THOSE FUNCTIONS WERE NOT RAN, PLANNED FOR AFTER DEPLOYMENT
-- RBAC grants for DUITZ termpaper database
-- Run this script as a database owner / superuser in pgAdmin.
-- Assumptions:
--  - all objects are in schema public
--  - application calls SET ROLE to one of these roles (see bouncer.js)
--
-- Roles in scope: student, parent, teacher, moderator, admin, superadmin
-- This script focuses on object-level privileges (GRANT/REVOKE).
-- For row-level restrictions (e.g. parent only sees own child), use RLS with app.current_user_id.
ROLLBACK;  -- in case of partial run
BEGIN;

-- 1) Create roles if missing (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'student') THEN CREATE ROLE student; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'parent') THEN CREATE ROLE parent; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'teacher') THEN CREATE ROLE teacher; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'moderator') THEN CREATE ROLE moderator; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN CREATE ROLE admin; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'superadmin') THEN CREATE ROLE superadmin; END IF;
END $$;

-- Optional: superadmin inherits admin
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_auth_members m
    JOIN pg_roles r_role ON r_role.oid = m.roleid
    JOIN pg_roles r_mem ON r_mem.oid = m.member
    WHERE r_role.rolname = 'admin' AND r_mem.rolname = 'superadmin'
  ) THEN
    GRANT admin TO superadmin;
  END IF;
END $$;

-- 2) Schema usage
GRANT USAGE ON SCHEMA public TO student, parent, teacher, moderator, admin, superadmin;

-- 3) Tighten defaults (don’t rely on PUBLIC)
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- 4) TABLES
-- Reference list from your pgAdmin inventory
-- Core academic data
GRANT SELECT ON TABLE public.students, public.teacher, public.parents TO student, parent, teacher;
GRANT SELECT ON TABLE public.lessons, public.homework, public.journal, public.studentdata TO student, parent, teacher;
GRANT SELECT ON TABLE public.timetable, public.subjects, public."class", public.days, public.material TO student, parent, teacher;

-- Parent/student linkage
GRANT SELECT ON TABLE public.studentparent TO parent, teacher;

-- Staff/admin panel tables
GRANT SELECT ON TABLE public.users TO teacher, moderator, admin, superadmin;

-- Admin-only system tables (roles/userrole)
GRANT SELECT ON TABLE public.roles, public.userrole TO admin, superadmin;

-- Teacher CRUD (per requirements)
-- Teacher can CRUD lessonss, homework, and studentdata (grades/presence)
GRANT INSERT, UPDATE, DELETE ON TABLE public.lessons, public.homework, public.studentdata TO teacher;

-- Parent/student should not modify academic tables
REVOKE INSERT, UPDATE, DELETE ON TABLE public.lessons, public.homework, public.journal, public.studentdata FROM student, parent;

-- Admin CRUD: "CRUD everything" excluding restrictions described
-- Admin can CRUD academic/master data
GRANT INSERT, UPDATE, DELETE ON TABLE
  public.students,
  public.teacher,
  public.parents,
  public.lessons,
  public.homework,
  public.journal,
  public.studentdata,
  public.timetable,
  public.subjects,
  public."class",
  public.days,
  public.material,
  public.studentparent
TO admin;

-- Admin restrictions:
--  - cannot edit/delete users, roles, userrole
REVOKE UPDATE, DELETE ON TABLE public.users, public.roles, public.userrole FROM admin;

-- Superadmin full CRUD on everything including system tables
GRANT INSERT, UPDATE, DELETE ON TABLE public.users, public.roles, public.userrole TO superadmin;

-- Moderator should not CRUD tables
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM moderator;

-- 5) SEQUENCES
-- If your tables use sequences, INSERT may fail without this. Grant broadly where INSERT is allowed.
-- (Safe in most schemas; if you want stricter control, list sequences explicitly.)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO teacher, admin, superadmin;

-- 6) VIEWS (SELECT)
GRANT SELECT ON TABLE
  public.vw_students_avg_above_7,
  public.vw_students_by_class,
  public.vw_student_ranking,
  public.vw_homework_by_student_or_class,
  public.vw_homework_tomorrow,
  public.vw_view_timetable_week,
  public.teachers_with_classes,
  public.vw_class_attendance_last_month
TO student, parent, teacher;

GRANT SELECT ON TABLE
  public.vw_students_avg_above_7,
  public.vw_students_by_class,
  public.vw_student_ranking,
  public.vw_homework_by_student_or_class,
  public.vw_homework_tomorrow,
  public.vw_view_timetable_week,
  public.teachers_with_classes,
  public.vw_class_attendance_last_month
TO admin, superadmin;

-- 7) FUNCTIONS (EXECUTE)
-- Student-associated
GRANT EXECUTE ON FUNCTION
  public.get_student_grade_entries(integer, date, date),
  public.get_student_marks(integer, date, date),
  public.get_student_grades_and_absences(integer, date, date),
  public.student_attendance_report(integer, date, date),
  public.student_day_plan(integer, date),
  public.get_timetable_id_by_student_id(integer)
TO student;

-- Parent-associated
GRANT EXECUTE ON FUNCTION
  public.get_children_by_parent(integer),
  public.get_student_grade_entries(integer, date, date),
  public.student_attendance_report(integer, date, date)
TO parent;

-- Teacher-associated
GRANT EXECUTE ON FUNCTION
  public.get_teacher_salary(integer, date, date)
TO teacher;

-- Homework functions (read-only)
GRANT EXECUTE ON FUNCTION
  public.get_homework_by_date(character varying, date),
  public.get_homework_by_date_class(character varying, date),
  public.homework_by_date_subject(date, integer)
TO student, parent, teacher;

-- System/auth helper
-- login_user is typically called by auth service under a privileged role; exposing to everyone is optional.
GRANT EXECUTE ON FUNCTION
  public.login_user(character varying, character varying, character varying, integer)
TO admin, superadmin, student, teacher, parent;

-- Admin panel helper
GRANT EXECUTE ON FUNCTION
  public.get_data_by_user_id(integer),
  public.get_user_role(integer)
TO admin, superadmin, student, teacher, parent;

-- 8) PROCEDURES (EXECUTE)
-- Teacher CRUD via stored procs
GRANT EXECUTE ON PROCEDURE
  public.proc_create_homework(character varying, integer, integer, date, text, character varying),
  public.proc_update_homework(integer, character varying, integer, integer, date, text, character varying),
  public.proc_delete_homework(integer),
  public.proc_create_lesson(character varying, character varying, integer, integer, integer, date, character varying),
  public.proc_update_lesson(integer, character varying, character varying, integer, integer, integer, date),
  public.proc_delete_lesson(integer),
  public.proc_create_studentdata(integer, integer, integer, smallint, public.journal_status_enum, text, character varying),
  public.proc_update_studentdata(integer, integer, integer, integer, smallint, public.journal_status_enum, text),
  public.proc_delete_studentdata(integer)
TO teacher;

-- Admin CRUD via stored procs (everything except restricted)
-- If your procs have different signatures, use psql/pgAdmin to copy exact signatures.
GRANT EXECUTE ON ALL PROCEDURES IN SCHEMA public TO admin, superadmin;

-- Moderator: only reset passwords
REVOKE EXECUTE ON ALL PROCEDURES IN SCHEMA public FROM moderator;
GRANT EXECUTE ON PROCEDURE public.proc_reset_user_password(integer, character varying) TO moderator;

-- Superadmin: role/user management
GRANT EXECUTE ON PROCEDURE
  public.proc_assign_role_to_user(integer, integer),
  public.proc_remove_role_from_user(integer, integer),
  public.proc_assign_user_to_entity(integer, integer, character varying),
  public.proc_register_user(character varying, character varying, character varying, character varying),
  public.proc_assign_student_parent(integer, integer),
  public.proc_unassign_student_parent(integer, integer)
TO superadmin;

-- Admin should not manage roles/userroles
REVOKE EXECUTE ON PROCEDURE public.proc_assign_role_to_user(integer, integer) FROM admin;
REVOKE EXECUTE ON PROCEDURE public.proc_remove_role_from_user(integer, integer) FROM admin;

COMMIT;
