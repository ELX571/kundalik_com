subject = {
    1: "MATH",
    2: "ENGLISH",
    3: "HISTORY"
}

subject_time = ["09:00", "11:00", "13:00", "15:00"]

for_s_d1 = ["Monday", "Wednesday", "Friday"]
for_s_d2 = ["Tuesday", "Thursday", "Saturday"]


class Subject:
    def __init__(self, code, name, subject_name, time, days):
        self.code = code
        self.name = name
        self.subject_name = subject_name
        self.time = time
        self.days = days

    @classmethod
    def from_dict(cls, code, data):
        return cls(
            code,
            data["name"],
            data["subject_name"],
            data["time"],
            list(data["days"])
        )

    def to_dict(self):
        return {
            "name": self.name,
            "subject_name": self.subject_name,
            "time": self.time,
            "days": list(self.days)
        }

    def get_sub_time(self):
        return f"{self.subject_name} | {self.time} | {', '.join(self.days)}"
