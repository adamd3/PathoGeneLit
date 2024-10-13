import math


class FastFisher:
    def __init__(self):
        self.f = [0.0]

    def extend_to(self, max_size: int):
        while len(self.f) <= max_size:
            i = len(self.f)
            self.f.append(self.f[i - 1] + math.log(i))

    @classmethod
    def with_capacity(cls, max_size: int):
        fisher = cls()
        fisher.extend_to(max_size)
        return fisher

    def get_p(self, a: int, b: int, c: int, d: int, same: float) -> float:
        return math.exp(same - (self.f[a] + self.f[b] + self.f[c] + self.f[d]))

    def get_p_value(self, a: int, b: int, c: int, d: int) -> float:
        n = a + b + c + d
        if n > len(self.f):
            return float("nan")
        same = self.f[a + b] + self.f[c + d] + self.f[a + c] + self.f[b + d] - self.f[n]
        p = self.get_p(a, b, c, d, same)

        minimum = min(c, b)
        for _ in range(minimum):
            a += 1
            b -= 1
            c -= 1
            d += 1
            p += self.get_p(a, b, c, d, same)
        return p
