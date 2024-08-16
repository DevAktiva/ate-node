# Aktiva Transaksional Email Node JS SDK

Node JS Library for Aktiva Transaksional Email API

## Install

```bash
npm install @aktiva/transaksional-email
```

## Setup

You need API token to authenticate the library with ATE API, which is available in the [Aktiva Transaksional Email Dashboard](https://apps.aktiva.co.id/email-api)

```typescript
import { ATE } from '@aktiva/transaksional-email'
const ate = new ATE('<api-token>')
```

## Usage

Send your first email:

```typescript
await ate.emails.send({
  from: 'richi.setya@aktiva.co.id',
  to: 'r@richi.web.id',
  subject: 'Hello from Aktiva Transaksioanl Email SDK',
  text: 'Hi, this is a test email!'
}) 
```

## Send using HTML

Send email using custom HTML content:

```typescript
await ate.emails.send({
  from: 'richi.setya@aktiva.co.id',
  to: 'r@richi.web.id',
  subject: 'Hello from Aktiva Transaksioanl Email SDK',
  html: '<p>Hi, this is a test email!</p>'
}) 
```

## Lincese

MIT Lincense
