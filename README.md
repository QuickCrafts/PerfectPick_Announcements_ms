# Ads Microservice

Generation and management ads based on user likes of movies, songs and books.

---
<br />

## API Reference

### Ads Management

#### Create ad

Create new ad. Returns ad id generated.

```http
  POST /ads
```

```typescript
// Body interface
interface Create_Ad{
  name: string
  ad: string // string Base64 Ad image coded
  start_date: string //timestamp of start date to publish ad
  end_date: string //timestamp of end date to publish ad
  description: string
  id_company: int
}
```

| Response Status | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `201` | `success` | Returns ad id|
| `400` | `error` | "Guard failed" |
| `500` | `error` | Any other error message|

```typescript
// Response interface
interface Create_ad_Response{
  id: number // Ad id
}
```

#### Update ad

Update ad.

```http
  PUT /ads/${id}
```

```typescript
// Body interface
interface Update_Ad{
  name?: string
  ad?: string // string Base64 Ad image coded
  start_date?: string //timestamp of start date to publish ad
  end_date?: string //timestamp of end date to publish ad
  description?: string
  id_company?: string
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. ad id |

| Response Status | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `201` | `success` | "Ad updated"|
| `400` | `error` | "Guard failed" |
| `400` | `error` | "Id not provided" |
| `404` | `error` | "Ad not found" |
| `500` | `error` | Any other error message|

#### Delete ad

Delete ad.

```http
  DELETE /ads/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. ad id |

| Response Status | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `201` | `success` | "Ad deleted"|
| `400` | `error` | "Id not provided" |
| `404` | `error` | "Ad not found" |
| `500` | `error` | Any other error message|

#### Get ad

Get ad.

```http
  GET /ads/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. ad id |

| Response Status | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `200` | `success` | Return complete ad information|
| `400` | `error` | "Id not provided" |
| `404` | `error` | "Ad not found" |
| `500` | `error` | Any other error message|

```typescript
interface Company {
    id: number // company id
    name: string
    email: string
}

// Response interface
interface Ad {
    id: number // ad id
    name: string
    ad_url: string // Bucket url to display ad image
    start_date: string //timestamp of start date to publish ad
    end_date: string //timestamp of end date to publish ad
    description: string
    company: Company
    published: boolean
}
```

#### Get ads

Get ads by company, published state or start and end date.

If exact_date = true is given and start date is given, it returns all the ads that start_date == start date given.
If exact_date = true is given and end date is given, it returns all the ads that end_date == end date given.

If only start date is given, it returns all the ads that start_date >= start date given.
If only end date is given, it returns all the ads that end_date <= end date given.

```http
  GET /ads
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `company` | `int` | company id |
| `exact_date` | `boolean` | exact start or end date ad |
| `start_date` | `string` | start date timestamp |
| `end_date` | `string` | end date timestamp |
| `published` | `boolean` | is a published ad? |

| Response Status | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `200` | `success` | Return ads list|
| `400` | `error` | "Id not provided" |
| `404` | `error` | "Ad not found" |
| `500` | `error` | Any other error message|

```typescript
interface Company {
    id: number // company id
    name: string
    email: string
}

interface Ad {
    id: number // ad id
    name: string
    ad_url: string // Bucket url to display ad image
    start_date: string //timestamp of start date to publish ad
    end_date: string //timestamp of end date to publish ad
    description: string
    company: Company
    published: boolean
}

// Response interface
interface Get_Ads_Response {
    ads: Ad[]
}
```

### Release

#### Publish Ad

Verifies if an ad is already paid and is inside an active start/end date to change to published the ad state.

```http
  POST /ads/publish/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. ad id |

| Response Status | Type     | Description          |
| :-------- | :------- | :------------------------- |
| `201` | `success` | "Ad published"|
| `400` | `error` | "Ad not paid or not in active dates."|
| `400` | `error` | "Id not provided" |
| `404` | `error` | "Ad not found" |
| `500` | `error` | Any other error message|

#### Time Triggered Publish Ad Routine (TTPAR)

Every day at 00:00 all the not published ads are reviewed. If Ad is already paid and is inside an active start/end date, then is triggered a publishAd() action to publish the ad.

#### Get User Ads

Returns all the active ads for a given user.

```http
  GET /ads/active/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. user id |

| Response Status | Type     | Description          |
| :-------- | :------- | :------------------------- |
| `200` | `success` | Returns all the active ads|
| `400` | `error` | "Id not provided" |
| `404` | `error` | "User not found" |
| `500` | `error` | Any other error message|

```typescript
interface Company {
    id: number // company id
    name: string
    email: string
}

interface Ad {
    id: number // ad id
    name: string
    ad_url: string // Bucket url to display ad image
    start_date: string //timestamp of start date to publish ad
    end_date: string //timestamp of end date to publish ad
    description: string
    company: Company
    published: boolean
}

// Response interface
interface Get_Ads_Response {
    ads: Ad[]
}
```

### Analysis

#### Generate Analysis

Generate a user likes analysis given a movie, book or song. Organized by user gender, nationality and age.

```http
  GET /ads/analysis
```

```typescript
interface Like_Relation{
  id: string
  user_id: string
  type: 'MOV' | 'BOO' | 'SON'
  rating?: float // given by the user searched
  like_type: 'LK' | 'DLK' | 'BLK' // Liked | Disliked | Blank (no info yet)
  wishlist: boolean // Inside user wishlist? Yes or No
}

interface Country{
  id: number
  name: string // English name
  code_2: string //ISO 3166-1 alpha-2
  code_3: string //ISO 3166-1 alpha-3
}

interface Get_User{
  id: string // User id
  firstname: string
  lastname: string // User last name
  avatar_url?: string // Url of avatar image
  birthdate?: string // String with the timestamp
  gender?: 'M' | 'F' | 'O' | 'P' // User gender coded
  country?: Country // Country information
  created_time: string // String with the timestamp
  email: string
  verified: boolean
  setup: boolean
}

// Body interface
interface New_Analysis{
  likes: Like_Relation[] // All likes related with the media id
  users: Get_User[] // All the users
  countries: Country[] // All the countries
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. media id |
| `type` | `enum('MOV', 'BOO', 'SON')` | **Required**. media type |

| Response Status | Type     | Description          |
| :-------- | :------- | :------------------------- |
| `200` | `success` | Returns a complete analysis|
| `500` | `error` | Any other error message|

```typescript

//@todo

// Response interface
interface Analysis {
    id: number // media id
    gender: Gender_Analysis
    nationality: Nationality_Analysis
    age: Age_Nationality
}
```

### Company

### Payment

---
<br />
<br />
<br />


## Deployment

To deploy this project run

[//]: <> (@todo correct)

```bash
  npm run deploy
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/QuickCrafts/PerfectPick_Announcements_ms.git
```

Go to the project directory

```bash
  cd PerfectPick_Announcements_ms
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
