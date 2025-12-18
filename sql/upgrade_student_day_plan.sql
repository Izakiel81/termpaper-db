-- Upgrade student_day_plan function to accept a date and return upcoming lessons starting at that date
-- Run this in the database as a privileged user: psql -d termpaperdb -f upgrade_student_day_plan.sql

CREATE OR REPLACE FUNCTION student_day_plan(p_student_id INT, p_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(
  lesson_name VARCHAR,
  mark SMALLINT,
  homework TEXT,
  lesson_date DATE,
  lesson_time TIME,
  subject VARCHAR,
  teacher VARCHAR,
  class VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(l.lesson_name, l.subject, '') AS lesson_name,
    sd.mark,
    h.homework_desc,
    l.lesson_date,
    l.lesson_time,
    l.subject,
    t.teacher_name AS teacher,
    s.student_class AS class
  FROM students s
  JOIN lessons l ON l.lesson_class = s.student_class
  LEFT JOIN studentdata sd ON sd.student_id = s.student_id AND sd.lesson_id = l.lesson_id
  LEFT JOIN homework h ON h.homework_class = s.student_class AND h.homework_date = l.lesson_date
  LEFT JOIN teachers t ON t.teacher_id = l.teacher_id
  WHERE s.student_id = p_student_id
    AND l.lesson_date >= p_date
  ORDER BY l.lesson_date, l.lesson_time;
  RETURN;
END;
$$;

-- Notes:
-- - This function returns upcoming lessons starting from p_date (inclusive).
-- - If you want only the lessons for a single day, call it with the same date value for p_date.
-- - The returned columns include lesson_date and lesson_time to support rendering in the UI.
-- - Adjust table/column names if your schema differs.
