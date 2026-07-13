#!/usr/bin/env bash
set -euo pipefail

for dir in packages/*; do
  name=$(bun -e "console.log(require('./$dir/package.json').name)")
  version=$(bun -e "console.log(require('./$dir/package.json').version)")
  if npm view "$name@$version" version >/dev/null 2>&1; then
    echo "skip $name@$version (already published)"
  else
    (cd "$dir" && bun publish --access public)
  fi
done

bunx changeset tag
