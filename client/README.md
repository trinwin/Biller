<p align="center">
    <img width="150" src="./src/assets/biller_logo.png">
</p>

<h1 align="center">Biller</h1>

<div align="center">
A 3-tier web application for monitor financial status and monthly spending. </br></br>

<a href="https://github.com/trinityng/Biller/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-green.svg" alt="PRs Welcome" />
</a>
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/trinityng/Biller">
<a href="https://www.javascript.com/">
    <img src="https://img.shields.io/github/languages/top/trinityng/Biller" alt="Top Language" />
</a>
<img alt="GitHub issues" src="https://img.shields.io/github/issues/trinityng/Biller">
<img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/trinityng/Biller">
<img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/trinityng/Biller">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/trinityng/Biller">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/trinityng/Biller">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/trinityng/Biller?style=social">

![Biller gif demo](../doc/demo/Biller-Demo.gif)

</div>

### 📊 Project Storyboard: [Biller](https://github.com/trinityng/Biller/projects/1)

## 🌟 Features

- 🙍🏻‍♀️ Signup/Login with Biller
- 🔏 Protect your data with JWT authentication
- 🏦 Connect to your Bank online account (Chase, Wells Fargo, etc.)
- 📑 Connect to utilities account (PG&E, comcast, etc.)
- 💳 Manage your credit card usage
- 💵 Monitor your income and expenses' transactions
- 📈 Visualize your income and spending in a graph
- ⏰ Alert incoming bills

## 📂 Technologies Used

### Frontend

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [Ant Design](https://github.com/ant-design/ant-design)
- [Shards Dashboard](https://github.com/DesignRevision/shards-dashboard)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [Jest](https://github.com/facebook/jest)
- [Enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme)

### Backend

- [Django](https://github.com/django/django)
- [MySQL](https://www.mysql.com/)
- [JWT](https://github.com/jpadilla/pyjwt)
- [Plaid API](https://github.com/plaid/plaid-python)

## ✅ Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### 📍 Prerequisites

What things you need to install the software and how to install them

- Install [Node.js/npm](https://nodejs.org/en/download/)
- Install [python3/pip3](https://www.python.org/downloads/) (Version >= 3.6)
- Install [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)

### ⚒️ Installation

```
# Clone this repository
git clone https://github.com/trinityng/biller

# Go into the repository
cd Biller
```

### 💻 Client Start-up

```
# Go into client folder
cd client
# Install client dependencies
npm install
# Start client on localhost:3000
npm start
```

### ⌨️ Server Start-up

```
# Create virtual environment (recommend) using conda/virtualenv
conda create --name your_env_name

# Start virtual env
source activate your_env_name
```

```
# Setup Plaid API Keys

# Go into server folder
cd server

# Create a file in a root server folder called "Plaid_API_Keys"
# Place your PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_PUBLIC_KEY in the file
```

```
# Install server packages from requirements.txt
pip3 install -r requirements.txt or python -m pip3 install -r requirements.txt

# Create new migrations
python3 manage.py makemigrations

# Apply new migrations
python3 manage.py migrate

# Start server on localhost:8000
python3 manage.py runserver
```

## ⚙️ Testing

```
# Test server using Django unittest
cd server
python3 manage.py test
```

```
# Test client using Jest and Enzyme
cd client
npm test
```

## ⭐️ Authors

👩🏻‍💻 **Trinity Nguyen** - [trinityng](https://github.com/trinityng) (Project Lead + Frontend Lead)

👨🏻‍💻 **Au Tran** - [au-tran](https://github.com/au-tran) (Backend Lead)

👨🏻‍💻 **Matthew Vu** - [Redjay17](https://github.com/Redjay17) (Frontend Developer)

See also the list of [contributors](https://github.com/trinityng/Biller/contributors) who participated in this project.
