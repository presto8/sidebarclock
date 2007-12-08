# 
# Replace xxVER and xxDATE
# How: Find all files with .xx extension.  Search for xxVAR and replace it with value in this file.  Output results to filename mnus .xx extension.

find . -type f -name \*.xx -exec bash keywords.sh "{}" \; 

# Minify Javascript

# Clean up all files
