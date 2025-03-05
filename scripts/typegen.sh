#!/bin/bash

# Directory containing .d.ts files
TYPES_DIR="$(dirname "$0")/../src/types"

# Output file
OUTPUT_FILE="$(dirname "$0")/../src/types/index.d.ts"

# Remove existing index.d.ts if it exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Create new output file with header
echo '// Auto-generated index.d.ts file' > "$OUTPUT_FILE"

# Find all .d.ts files (excluding index.d.ts) and generate export statements
find "$TYPES_DIR" -name "*.d.ts" ! -name "index.d.ts" | while read -r file; do
    # Extract the filename without extension and directory path
    filename=$(basename "$file" .d.ts)
    
    # Add export statement
    echo "export * from './${filename}'" >> "$OUTPUT_FILE"
done

echo "Type definitions have been generated in $OUTPUT_FILE"