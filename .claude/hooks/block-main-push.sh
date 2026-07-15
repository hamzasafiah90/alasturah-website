#!/bin/sh
# Blocks `git push` that would push to the main branch (main auto-deploys to production via Cloudflare).
cmd=$(node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{process.stdout.write(JSON.parse(d).tool_input.command||'')}catch(e){}})")

echo "$cmd" | grep -Eq '(^|[;&|]|&&)[[:space:]]*git[[:space:]]+push' || exit 0

target=$(echo "$cmd" | grep -Eo '(^|[[:space:]:])main([[:space:]:]|$)' | head -1 | tr -d '[:space:]:')

current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [ -z "$target" ] && [ "$current_branch" = "main" ]; then
  if echo "$cmd" | grep -Eq '(^|[[:space:]])HEAD([[:space:]:]|$)'; then
    target="main"
  elif ! echo "$cmd" | grep -Eq '[[:space:]][A-Za-z0-9_./-]+:[A-Za-z0-9_./-]+|[[:space:]][A-Za-z0-9_./-]+[[:space:]]+[A-Za-z0-9_./-]+([[:space:]]|$)'; then
    target="main"
  fi
fi

if [ "$target" = "main" ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Direct pushes to main are blocked in this project: main auto-deploys straight to production via Cloudflare Workers. Push a branch and open a PR instead."}}'
  exit 0
fi

exit 0
