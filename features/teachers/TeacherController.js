import teacherService from "./TeacherService.js";
class TeacherController {
  async getTeacher(req, res, next) {
    try {
      const teachers = await teacherService.getTeacher();

      res.status(200).json({ teachers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTeacherById(req, res, next) {
    try {
      const { id } = req.params;

      const teachers = await teacherService.getTeacherById(id);
      res.status(200).json({ teachers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTeacherWithClasses(req, res, next) {
    try {
      const teachers = teacherService.getTeacherWithClasses();
      res.status(200).json({ teachers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTeacherSalary(req, res, next) {
    try {
      const { teacherId, fromDate, toDate } = req.query;
      const teachers = teacherService.getTeacherSalary(
        teacherId,
        fromDate,
        toDate,
      );
      res.status(200).json({ teachers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addTeacher(req, res, next) {
    try {
      const { name, surname, patronym, phone } = req.body;
      const newTeacher = await teacherService.addTeacher(
        name,
        surname,
        patronym,
        phone,
      );
      res.status(200).json({ newTeacher });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateTeacher(req, res, next) {
    try {
      const { id, name, surname, patronym, phone } = req.body;
      await teacherService.updateTeacher(id, name, surname, patronym, phone);
      res
        .status(200)
        .json({ message: "Teacher has been successfully changed" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deleteTeacher(req, res, next) {
    try {
      const { id } = req.params;
      await teacherService.deleteTeacher(id);
      res
        .status(200)
        .json({ message: "Teacher has been successfully deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new TeacherController();
