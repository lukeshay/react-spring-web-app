#!/bin/bash
python3 -c 'import random, string; print("".join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(48)))'