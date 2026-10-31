git push and pull request to main
        ↓
Job 1: Lint + Test (on GitHub Action runner)
        ↓ pass
Job 2: Build + Push to Docker
  → builds Docker image
  → pushes to Docker tagged with git SHA as the Image tag
        ↓ success
Job 3: Deploy the image to EC2
  → SSHes into EC2
  → git pull latest code (for docker-compose.yml + .env)
  → Docker Login
  → docker pull new image
  → APP_IMAGE=new-image docker compose up -d --no-build
      → postgres container stays running (already healthy)
      → app container replaced with new image
      → volumes preserved ✅
      → network preserved ✅
      → .env loaded from server ✅
  → health check confirms /health returns 200
  → writes new APP_IMAGE to .env
        ↓
✅ Deploy complete — no manual steps
