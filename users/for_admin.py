
from kundalik.main_control.user import User, UserType
# admin = Admin()
#  Add_teacher
# admin.add_teacher()  # user1
# admin.add_teacher()  # user2
# admin.add_teacher()  # user3


class Admin:
    def __init__(self):
        self.users = {}

    def add_teacher(self):
        print('USER qoshish bolimi!!!')
        index = len(self.users) + 1
        user_key = f"user{index}"
        username = input(" username of user >>> ").lower()
        password = input("Password (4 digits) >>> ")
        first_name = input("First name >>> ").title()
        last_name = input("Last name >>> ").title()
        middle_name = input("Middle name >>> ").title()
        birth_date = input("Birth date (DD.MM.YYYY) >>> ")

        # ----------- check password ----------
        if len(password) != 4 or not password.isdigit():
            print('( ERROR ) Parol 4 ta raqamdan iborat bo‘lishi kerak!')
            return

        # ----------- check birth_date ----------
        if len(birth_date) != 10:
            print('( ERROR ) Tug‘ilgan sana noto‘g‘ri!')
            return

        # ----------- check middle_name ----------
        if not middle_name.endswith(("ovich", "ovna")):
            print("( ERROR ) Middle name 'ovich' yoki 'ovna' bilan tugashi shart!")
            return

        teacher = User(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            middle_name=middle_name,
            birth_date=birth_date,
            user_type=UserType.TEACHER
        )

        self.users[user_key] = teacher
        print(f"{user_key} qo‘shildi ")


admin = Admin()

admin.add_teacher()
admin.add_teacher()
admin.add_teacher()








