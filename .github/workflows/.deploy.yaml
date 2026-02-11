name: Build All Repo Apps

on:
  push:
    branches:
      - main

jobs:
  buildBOOKAPP:
    runs-on: ubuntu-latest

    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      # Build artiqui and pack it
      - name: Build artiqui
        run: |
          cd ALLREPOBOOKPRIEST/artiqui
          npm install
          npm run build
          npm pack  # creates artiqui-<version>.tgz

      # Build book_priest with packed artiqui
      - name: Build book_priest
        run: |
          cd ALLREPOBOOKPRIEST/book_priest
          npm install ../artiqui/artiqui-*.tgz
          npm install
          npm run build

      # Install Vercel CLI
      - name: Install Vercel CLI
        run: npm install --global vercel

      # Pull Vercel Project Settings
      - name: Pull Vercel Project Settings
        run: vercel pull --yes --environment=production --cwd=ALLREPOBOOKPRIEST/book_priest --token=${{ secrets.VERCEL_TOKEN }}

      # Deploy book_priest
      - name: Deploy to Vercel
        run: vercel deploy --prod --cwd=ALLREPOBOOKPRIEST/book_priest --token=${{ secrets.VERCEL_TOKEN }}
