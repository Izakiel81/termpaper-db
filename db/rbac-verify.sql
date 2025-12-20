-- RBAC verification helper
-- Run as a superuser/db owner.

-- Quick privilege checks using has_*_privilege.
-- Replace object names if your schema differs.

-- === STUDENT ===
SET ROLE student;
SELECT current_user, current_role;
SELECT has_schema_privilege('student', 'public', 'USAGE') AS student_schema_usage;
SELECT has_table_privilege('student', 'public.students', 'SELECT') AS student_can_select_students;
SELECT has_table_privilege('student', 'public.studentdata', 'SELECT') AS student_can_select_studentdata;
SELECT has_table_privilege('student', 'public.studentdata', 'INSERT') AS student_can_insert_studentdata;
SELECT has_function_privilege('student', 'public.student_attendance_report(integer)', 'EXECUTE') AS student_can_exec_attendance;
RESET ROLE;

-- === PARENT ===
SET ROLE parent;
SELECT current_user, current_role;
SELECT has_function_privilege('parent', 'public.get_children_by_parent(integer)', 'EXECUTE') AS parent_can_exec_children;
SELECT has_function_privilege('parent', 'public.student_attendance_report(integer)', 'EXECUTE') AS parent_can_exec_attendance;
SELECT has_table_privilege('parent', 'public.studentdata', 'INSERT') AS parent_can_insert_studentdata;
RESET ROLE;

-- === TEACHER ===
SET ROLE teacher;
SELECT current_user, current_role;
SELECT has_table_privilege('teacher', 'public.homework', 'INSERT') AS teacher_can_insert_homework;
SELECT has_table_privilege('teacher', 'public.lesson', 'UPDATE') AS teacher_can_update_lesson;
SELECT has_table_privilege('teacher', 'public.studentdata', 'DELETE') AS teacher_can_delete_studentdata;
SELECT has_function_privilege('teacher', 'public.get_teacher_salary(integer, date, date)', 'EXECUTE') AS teacher_can_exec_salary;
RESET ROLE;

-- === MODERATOR ===
SET ROLE moderator;
SELECT current_user, current_role;
SELECT has_function_privilege('moderator', 'public.student_attendance_report(integer)', 'EXECUTE') AS mod_can_exec_attendance;
SELECT has_function_privilege('moderator', 'public.proc_reset_user_password(integer, character varying)', 'EXECUTE') AS mod_can_exec_reset_pw;
RESET ROLE;

-- === ADMIN ===
SET ROLE admin;
SELECT current_user, current_role;
SELECT has_table_privilege('admin', 'public.users', 'UPDATE') AS admin_can_update_users;
SELECT has_table_privilege('admin', 'public.students', 'DELETE') AS admin_can_delete_students;
RESET ROLE;

-- === SUPERADMIN ===
SET ROLE superadmin;
SELECT current_user, current_role;
SELECT has_table_privilege('superadmin', 'public.users', 'UPDATE') AS super_can_update_users;
SELECT has_function_privilege('superadmin', 'public.proc_assign_role_to_user(integer, integer)', 'EXECUTE') AS super_can_assign_roles;
RESET ROLE;
