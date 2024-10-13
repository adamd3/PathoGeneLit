from utils.fast_fisher import FastFisher
from utils.bitmap import Bitmap
from cachetools import TTLCache
import uuid


class PersistentState:
    def __init__(self):
        self.fisher = FastFisher()
        self.bitmaps: dict[uuid.UUID, Bitmap] = {}
        self.latest: uuid.UUID | None = None
        self.cache = TTLCache(maxsize=1000, ttl=30000)


state = PersistentState()
