from typing import Set
from kundalik.main_control.user import User
from kundalik.database.utils import save_students
from kundalik.users.student_control import about_students
from kundalik.main_control.user import UserType
from kundalik.main_control.subjects import Subject


class Teacher:
    def __init__(
            self,
            user_id: int,
            school: str,
            subjects: Set[Subject] = None,
    ):
        if not User._instances.get(user_id):
            raise Exception("Bunday user mavjud emas")

        self.user_id = user_id
        self.school = school
        self.subjects = subjects
        if self.subjects is None:
            self.subjects = set()
        user = self.user
        user.user_type = UserType.TEACHER

    def add_subject(self, subject: Subject):
        self.subjects.add(subject)

    @property
    def user(self) -> User:
        return User._instances.get(self.user_id)

def for_teacher(cmd, user):
    end_teacher_cmd = f'{cmd}-raqamli buyruq yakunlandi!'
    if cmd == 0:
        pass
    elif cmd == 1:
        print("Studentlar ro'yxati: \n")

        for raqam, info in about_students.items():
            if raqam == "subjects":
                continue

            print(f"{raqam}. {info['name']}")

        print(end_teacher_cmd)

    elif cmd == 2:
        for raqam, info in about_students.items():
            if raqam == "subjects":
                continue
            print(f"{raqam}. {info['name']}")
        student_request = input('Student raqamini kiriting >> ')

        if str(student_request) not in about_students:
            print("Bunday raqamli student yo'q!")
            return

        student = about_students[str(student_request)]

        print(f"oquvchining mavjud fanlari :")
        for raqam, subjects in about_students['subjects'].items():
            print(raqam, subjects)

        subject_number = input("Qaysi fan bahosini o'zgartirmoqchisiz ? raqamini kiriting >> ")

        if subject_number not in student['grades'].keys():
            print('Bunday fan yo‘q!')
            return

        new_grade = int(input(f"{student['name']}ning {about_students['subjects'][subject_number]} "
                              f"fanidan yangi bahosi >> "))

        student['grades'][subject_number] = new_grade
        save_students(about_students)

        print(f"Baholar muvafaqiyatli o'zgartirildi va saqlandi!")
        print(f"\n{student['name']}ning, Yangilangan baholar:")
        for raqam, baho in student['grades'].items():
            fan_nomi = about_students['subjects'][str(raqam)]
            print(f"{fan_nomi}: {baho}")
        print(end_teacher_cmd)


    else:
        print("Bunday buyruq topilmadi!")

