from datetime import date, datetime

class UserType:
    TEACHER = "teacher"
    STUDENT = "student"
    ADMIN = "admin"


class User:
    _instances: dict = {}

    def __init__(
            self,
            username: str,
            password: str,
            first_name: str,
            last_name: str,
            middle_name: str,
            birth_date: str,
            user_type: str = None,
    ):

        self.first_name = first_name
        self.last_name = last_name
        self.middle_name = middle_name
        self.birth_date = datetime.strptime(birth_date, "%d.%m.%Y")

        self.validate_username(username)
        self.username = username
        self.password = password
        self.user_type = user_type
        self.id = self.get_id()

        User._instances[self.id] = self

    def get_full_name(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}"

    def get_age(self):
        current_year = datetime.now().year
        return current_year - self.birth_date.year

    @property
    def age(self):
        return self.get_age()

    @property
    def full_name(self):
        return self.get_full_name()

    def get_id(self) -> int:
        ids = User._instances.keys()
        if not ids:
            return 0

        return max(ids) + 1

    def validate_username(self, username):
        for i in User._instances.values():
            if i.username == username:
                raise Exception("Bunday username mavjud")


user1 = User(
    username="1",
    password="1",
    first_name="Saidazimxon",
    last_name="Ismilow",
    middle_name="Saidolimxonxon o'g'li",
    birth_date="19.03.2009",
    user_type=UserType.STUDENT,
)

user2 = User(
    username="2",
    password="2",
    first_name="Saidazimxon",
    last_name="Ismilow",
    middle_name="Saidolimxonxon o'g'li",
    birth_date="19.03.2008",
    user_type=UserType.STUDENT,
)

user3 = User(
    username="2",
    password="2",
    first_name="Saidazimxon",
    last_name="Ismilow",
    middle_name="Saidolimxonxon o'g'li",
    birth_date="19.03.2007",
    user_type=UserType.STUDENT,
)
