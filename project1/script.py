
# Read the attached HTML file to see full structure and styling
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Print first 3000 characters to understand structure
print(content[:3000])
print("\n... [MIDDLE] ...\n")
print(content[-2000:])
