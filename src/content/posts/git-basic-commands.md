---
title: "Git 기초 명령어 완벽 정리"
date: "2025-01-10"
category: "학습내용"
tags: ["Git", "Version Control", "CLI"]
description: "개발자라면 반드시 알아야 할 Git 기초 명령어를 실전 예제와 함께 정리합니다."
---

# Git 기초 명령어 완벽 정리

Git은 현대 소프트웨어 개발의 필수 도구입니다. 하지만 처음 접하면 명령어가 너무 많아 어렵게 느껴집니다.

이 글에서는 **실무에서 90% 사용하는 핵심 명령어**만 정리했습니다.

## 🎯 Git이란?

**분산 버전 관리 시스템 (Distributed Version Control System)**

- 코드의 변경 이력을 추적
- 여러 사람이 동시에 작업 가능
- 이전 버전으로 쉽게 복구

## 📦 Git 설치 및 설정

### 설치 확인

```bash
git --version
# git version 2.40.0
```

### 초기 설정

```bash
# 사용자 이름 설정
git config --global user.name "NewplayerKOR"

# 이메일 설정
git config --global user.email "your-email@example.com"

# 설정 확인
git config --list
```

**왜 필요한가?**
- 모든 커밋에 작성자 정보 포함
- GitHub 계정과 연동

## 🚀 저장소 만들기

### 새 프로젝트 시작

```bash
# 1. 프로젝트 폴더 생성
mkdir my-project
cd my-project

# 2. Git 저장소 초기화
git init

# 결과: .git 폴더 생성 (숨김)
```

### 기존 프로젝트 복제

```bash
# GitHub에서 프로젝트 가져오기
git clone https://github.com/username/repository.git

# 특정 브랜치만 복제
git clone -b develop https://github.com/username/repository.git
```

## 📝 변경사항 기록하기

### Git의 3가지 영역

```
작업 디렉토리    →    스테이징    →    저장소
(Working Dir)      (Staging)      (Repository)
                  git add        git commit
```

### 파일 추가하기

```bash
# 특정 파일 스테이징
git add index.html

# 모든 변경사항 스테이징
git add .

# 특정 확장자만 추가
git add *.js

# 대화형 모드 (일부만 선택)
git add -p
```

### 상태 확인

```bash
git status

# 출력 예시:
# On branch main
# Changes to be committed:
#   (use "git restore --staged <file>..." to unstage)
#         modified:   index.html
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#         modified:   style.css
```

**색상 의미:**
- 🟢 초록색: 스테이징된 파일
- 🔴 빨간색: 수정되었지만 스테이징 안 됨
- ⚪ 회색: 추적되지 않는 파일

### 커밋하기

```bash
# 기본 커밋
git commit -m "Add login feature"

# 긴 메시지 작성 (에디터 열림)
git commit

# 스테이징 + 커밋 동시에
git add -A && git commit -m "Update styles"

# 또는 (추적 중인 파일만)
git commit -am "Fix typo"
```

**좋은 커밋 메시지:**
```bash
✅ git commit -m "Add user authentication"
✅ git commit -m "Fix login button alignment"
✅ git commit -m "Update README with setup instructions"

❌ git commit -m "update"
❌ git commit -m "fix"
❌ git commit -m "asdfasdf"
```

## 📜 히스토리 보기

### 커밋 로그 확인

```bash
# 기본 로그
git log

# 한 줄로 보기
git log --oneline

# 그래프로 보기
git log --oneline --graph --all

# 최근 3개만
git log -3

# 특정 파일의 히스토리
git log index.html
```

**예쁘게 보기:**
```bash
git log --oneline --graph --all --decorate

# 출력:
# * a1b2c3d (HEAD -> main) Add feature
# * e4f5g6h Update docs
# * i7j8k9l Initial commit
```

### 변경사항 비교

```bash
# 작업 디렉토리 vs 스테이징
git diff

# 스테이징 vs 저장소
git diff --staged

# 특정 커밋 비교
git diff a1b2c3d e4f5g6h

# 특정 파일만
git diff index.html
```

## 🌿 브랜치 작업

### 브랜치란?

독립적인 작업 공간. 메인 코드에 영향 없이 새 기능 개발 가능!

```
main      ●───●───●───●
               ╲
feature         ●───●  (새 기능 개발)
```

### 브랜치 명령어

```bash
# 브랜치 목록
git branch

# 새 브랜치 생성
git branch feature/login

# 브랜치 이동
git checkout feature/login

# 생성 + 이동 동시에
git checkout -b feature/login

# 또는 (최신 문법)
git switch -c feature/login

# 브랜치 삭제
git branch -d feature/login

# 강제 삭제
git branch -D feature/login
```

### 브랜치 병합

```bash
# main 브랜치로 이동
git checkout main

# feature 브랜치 병합
git merge feature/login

# Fast-forward 방지 (병합 커밋 생성)
git merge --no-ff feature/login
```

**충돌 발생 시:**
```bash
# 1. 충돌 파일 열기
# 2. <<<<<<<, =======, >>>>>>> 부분 수정
# 3. 수정 후 저장
# 4. 스테이징 + 커밋
git add .
git commit -m "Resolve merge conflict"
```

## 🔄 원격 저장소 작업

### 원격 저장소 연결

```bash
# 원격 저장소 추가
git remote add origin https://github.com/username/repo.git

# 원격 저장소 확인
git remote -v

# 원격 저장소 제거
git remote remove origin
```

### 푸시 (Push)

```bash
# 기본 푸시
git push origin main

# 처음 푸시 (추적 설정)
git push -u origin main

# 이후부터는 간단히
git push

# 모든 브랜치 푸시
git push --all

# 강제 푸시 (주의!)
git push -f
```

### 풀 (Pull)

```bash
# 최신 코드 가져오기
git pull

# = git fetch + git merge
git fetch origin
git merge origin/main

# Rebase로 가져오기 (히스토리 깔끔)
git pull --rebase
```

## 🔙 되돌리기

### 파일 변경 취소

```bash
# 작업 디렉토리 변경 취소
git restore index.html

# 스테이징 취소
git restore --staged index.html

# 또는 (구 문법)
git reset HEAD index.html
```

### 커밋 취소

```bash
# 마지막 커밋 취소 (변경사항 유지)
git reset --soft HEAD~1

# 마지막 커밋 취소 (스테이징은 유지)
git reset HEAD~1

# 마지막 커밋 취소 (모든 변경 삭제)
git reset --hard HEAD~1

# 특정 커밋으로 돌아가기
git reset --hard a1b2c3d
```

**주의**: `--hard`는 변경사항을 완전히 삭제합니다!

### 커밋 되돌리기 (안전)

```bash
# 새로운 커밋으로 되돌리기
git revert HEAD

# 특정 커밋 되돌리기
git revert a1b2c3d

# 여러 커밋 되돌리기
git revert HEAD~3..HEAD
```

**차이점:**
- `reset`: 히스토리 삭제 (위험)
- `revert`: 새 커밋 생성 (안전)

## 🏷️ 태그

### 태그 생성

```bash
# 간단한 태그
git tag v1.0.0

# 주석이 있는 태그 (권장)
git tag -a v1.0.0 -m "Release version 1.0.0"

# 특정 커밋에 태그
git tag v1.0.0 a1b2c3d
```

### 태그 관리

```bash
# 태그 목록
git tag

# 태그 푸시
git push origin v1.0.0

# 모든 태그 푸시
git push origin --tags

# 태그 삭제
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

## 🔍 유용한 명령어

### Stash (임시 저장)

```bash
# 현재 작업 임시 저장
git stash

# 메시지와 함께 저장
git stash save "WIP: login feature"

# 저장된 목록
git stash list

# 가장 최근 stash 적용
git stash apply

# 적용 + 삭제
git stash pop

# 특정 stash 적용
git stash apply stash@{0}

# stash 삭제
git stash drop
```

### Ignore 파일

`.gitignore` 파일 생성:

```gitignore
# 의존성
node_modules/
.pnp
.pnp.js

# 빌드 결과
dist/
build/
.next/

# 환경 변수
.env
.env.local

# 에디터
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

## 📊 실전 워크플로우

### Feature Branch 워크플로우

```bash
# 1. 최신 코드 받기
git checkout main
git pull

# 2. 새 기능 브랜치 생성
git checkout -b feature/user-profile

# 3. 작업 및 커밋
git add .
git commit -m "Add user profile page"

# 4. 원격에 푸시
git push -u origin feature/user-profile

# 5. GitHub에서 Pull Request 생성
# 6. 리뷰 후 main에 병합
# 7. 로컬 업데이트
git checkout main
git pull
git branch -d feature/user-profile
```

## 💡 꿀팁

### Alias 설정

```bash
# 자주 쓰는 명령어 단축키
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --all"

# 이제 이렇게 사용
git st
git co main
git lg
```

### 마지막 커밋 수정

```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "New message"

# 마지막 커밋에 파일 추가
git add forgotten-file.js
git commit --amend --no-edit
```

## 📚 정리

### 기본 워크플로우
```bash
1. git clone        # 프로젝트 가져오기
2. git checkout -b  # 브랜치 생성
3. (작업)
4. git add .        # 스테이징
5. git commit       # 커밋
6. git push         # 원격에 푸시
7. (Pull Request)
8. git pull         # 최신 코드 받기
```

### 자주 쓰는 명령어 TOP 10
1. `git status` - 상태 확인
2. `git add .` - 모든 변경사항 추가
3. `git commit -m` - 커밋
4. `git push` - 푸시
5. `git pull` - 풀
6. `git checkout` - 브랜치 이동
7. `git branch` - 브랜치 목록
8. `git log` - 히스토리
9. `git diff` - 변경사항 비교
10. `git merge` - 병합

Git 명령어는 외우는 것보다 **자주 사용하면서 익히는 것**이 중요합니다!

## 참고 자료

- [Pro Git Book (한글)](https://git-scm.com/book/ko/v2)
- [Git 공식 문서](https://git-scm.com/doc)
- [Visualizing Git](https://git-school.github.io/visualizing-git/)
