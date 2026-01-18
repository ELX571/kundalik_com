from kundalik.comands.comands_student import command_class,command_bolim,command_extra_classes
from kundalik.main_control.subjects import subject, subject_time, for_s_d1, for_s_d2
from kundalik.database.save_extra_student import load_students, save_students
from kundalik.main_control.subjects import Subject
# from kundalik.main_control.login import login
# from kundalik.main_control.user import UserType
# from kundalik.database.utils import load_data



class Student:
    def __init__(self, user):
        self.user = user
        self.data = load_students()

    def get_student(self, code):
        data = self.data.get(code)
        if not data:
            return None
        return Subject.from_dict(code, data)

    def class_student(self,command_class):
        answer=int
        while True:
            def sorov_class(command_class):
                for k,v in command_class.items():
                    print(f'{k} --> {v}')
                    answer=input('buyruq codini kiriting >>> ')
            print(sorov_class(command_class))
            if answer == 0:
                print('student class  bolimi yakunlandi!')
                break
            elif answer == 1:
                 pass
            elif answer == 2:
                pass

    def extra_class(self, code):
        if not (code.isdigit() and len(code) == 4):
            print("Parol 4 xonali raqam bo‘lishi kerak")
            return

        found = self.get_student(code)
        if not found:
            print("Bunday parolga ega o‘quvchi yo‘q")
            return

        print("Qo‘shimcha darslar:")
        for k, v in self.command_extra.items():
            print(f"{k} -> {v}")

        cmd = input("Buyruq >> ")

        if cmd == "1":
            print(found.get_sub_time())

        elif cmd == "2":
            ch = input("Day(d) yoki Clock(c) >> ").lower()

            if ch == "c":
                print(*subject_time, sep="\n")
                found.time = input("Yangi vaqt >> ")

            elif ch == "d":
                found.days = for_s_d2.copy() if found.days == for_s_d1 else for_s_d1.copy()

            self.data[found.code] = found.to_dict()
            save_students(self.data)
            print(f"Yangi oquv kunlaringiz saqlandi {found.days}")

        elif cmd == "3":
            for k, v in subject.items():
                print(f"{k}. {v}")
            n = int(input("Fan raqami >> "))
            if n in subject:
                found.subject_name = subject[n]
                self.data[found.code] = found.to_dict()
                save_students(self.data)
                print("Fan yangilandi")
            else:
                print("Bunday fan yo‘q")

    def run(self, cmd):
        if cmd == 1:
            self.class_student()
        elif cmd == 2:
            code = input("Parol >> ")
            self.extra_class(code)

