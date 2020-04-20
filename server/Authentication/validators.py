from django.core.exceptions import ValidationError

def validate_email(email):
    domain_whitelist = ['yahoo.com', 'gmail.com', 'hotmail.com', 'aol.com', 'msn.com', 'sjsu.edu']
    cleaned_email = email.strip()
    email_domain = cleaned_email.split('@')[1]
    if email_domain not in domain_whitelist:
         raise ValidationError("Email domain not recognized")

    illegal_first_characters = [str(number) for number in range(0,9)]
    illegal_first_characters += ['-', '_', '.']
    if cleaned_email[0] in illegal_first_characters:
        raise ValidationError("Illegal email naming convention")

    illegal_characters = ['<','>','(',')','[',']',';',':',',','\\','@']
    email_local = cleaned_email.split('@')[0]
    for char in illegal_characters:
        if email_local.find(char) != -1:
            raise ValidationError("Illegal character in email")
    
    return cleaned_email

def validate_name(name):
    if not name.isalpha():
        raise ValidationError("Names can only contain alphabet letters")
    return name
def validate_password(password):
    if len(password) < 8:
        raise ValidationError("Passwords need to be longer than 8")
    return password