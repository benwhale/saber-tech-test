import string
import random


def generate_slug(size=8, chars=string.ascii_letters + string.digits):
    """
    Generates a random slug.
    Not Cryptographically secure, but good enough for our purposes with 218 trillion combinations.
    """
    return ''.join(random.choice(chars) for _ in range(size))


if __name__ == "__main__":
    print(generate_slug())
