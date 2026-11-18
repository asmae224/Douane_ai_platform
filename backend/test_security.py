from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

# ===========================
# Test du hash
# ===========================

password = "Admin123!"

hashed = hash_password(password)

print("Mot de passe :", password)
print("Hash :", hashed)

# ===========================
# Test de vérification
# ===========================

print("Vérification correcte :", verify_password(password, hashed))

print("Mauvais mot de passe :", verify_password("Test123", hashed))

# ===========================
# Test JWT
# ===========================

token = create_access_token(
    data={
        "sub": "admin@prj_mcp.com",
        "role": "ADMIN"
    }
)

print("\nJWT :")
print(token)