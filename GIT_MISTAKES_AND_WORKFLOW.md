# Git Mistakes and Correct Workflow

## What happened

The project was eventually uploaded successfully to:

`https://github.com/Seetha-Kalyan/Ecom-complaints-resolver`

The following mistakes happened during the upload process.

## Mistakes made

### 1. Git was not available in the current terminal

PowerShell reported:

`git is not recognized`

Git was installed, but the existing PowerShell or VS Code terminal had not loaded the updated PATH.

**Correct action:** Close and reopen VS Code, or temporarily add Git to the current terminal:

```powershell
$env:Path += ";C:\Program Files\Git\cmd"
git --version
```

### 2. `git install` was used

`git install` is not a Git installation command. PowerShell tried to execute a command named `git`, but Git was not available in PATH.

**Correct action:** Install Git with `winget`, or install it from the official Git website:

```powershell
winget install --id Git.Git -e --source winget
```

### 3. The Git repository was initialized in the wrong folder

Git was initially rooted at:

`C:\Users\Seethapavankalyan`

instead of the project folder. As a result, `git status` showed unrelated folders such as `AppData`, `Downloads`, and other personal files.

**Correct project root:**

`C:\Users\Seethapavankalyan\OneDrive\Documents\ResolveNow - Online complaints\apsche project`

Always verify the root with:

```powershell
git rev-parse --show-toplevel
```

### 4. `node_modules` was committed

The first commit included files from `frontend/node_modules`. These are installed dependencies and should not be stored in Git.

**Correct action:** Add this to `.gitignore`:

```text
node_modules/
dist/
.env
```

Then remove already-tracked dependencies without deleting them locally:

```powershell
git rm -r --cached frontend/node_modules
git commit --amend --no-edit
```

### 5. Build files in `frontend/dist` were committed

The generated `frontend/dist` files were also included in the commit. Build output should normally be regenerated during deployment, not committed.

**Correct action:**

```powershell
git rm -r --cached frontend/dist
git commit --amend --no-edit
```

### 6. The remote pointed to the wrong repository

The remote initially pointed to an old Food Delivery repository:

`Food-Delivery-website.git`

GitHub returned `Repository not found` because that was not the intended repository.

**Correct action:** Set the correct remote URL:

```powershell
git remote set-url origin https://github.com/Seetha-Kalyan/Ecom-complaints-resolver.git
git remote -v
```

### 7. The upstream branch was not configured

Git reported that the local `main` branch had no upstream branch.

**Correct action:** Push once with:

```powershell
git push -u origin main
```

After that, future pushes only need:

```powershell
git push
```

### 8. The remote already contained commits

GitHub had commits that were not present locally, so Git rejected the push with `fetch first` or `non-fast-forward`.

**Correct action:** Fetch and integrate the remote branch before pushing:

```powershell
git pull origin main --allow-unrelated-histories
```

### 9. Merge conflicts occurred

Both the local project and GitHub had files with the same names, so Git reported `CONFLICT (add/add)`.

The local project was chosen as the source of truth with:

```powershell
git checkout --ours .
git add .
git commit -m "Merge remote project with local updates"
git push
```

`--ours` keeps the local version. It should only be used when the local files are definitely the desired versions.

### 10. `git status` was run from the wrong location

Running Git commands from the parent folder made the incorrect repository scope harder to notice and produced unrelated file listings.

**Correct action:** Always enter the project folder first:

```powershell
cd "C:\Users\Seethapavankalyan\OneDrive\Documents\ResolveNow - Online complaints\apsche project"
```

## Correct workflow for future changes

Use this workflow after changing frontend or backend code:

```powershell
cd "C:\Users\Seethapavankalyan\OneDrive\Documents\ResolveNow - Online complaints\apsche project"

git status
git add frontend
git commit -m "Update frontend"
git push
```

If backend files were also changed:

```powershell
git add frontend backend
git commit -m "Update frontend and backend"
git push
```

Before committing, check that these are not included:

```text
node_modules/
.env
dist/
```

## Useful checks

```powershell
git status
git remote -v
git branch --show-current
git log --oneline -5
git rev-parse --show-toplevel
```

A clean status means there are no uncommitted changes. The project root must be the `apsche project` folder, and `origin` must point to `Ecom-complaints-resolver`.
