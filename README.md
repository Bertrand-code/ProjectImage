### Image Processing API Project



## Run Locally

Clone the project

```bash
  https://github.com/Bertrand-code/image-api.git
```

Go to the project directory

```bash
  cd image-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
For testing

```bash
  npm test
```


## Features

- Resize image
- Blur/Sharp image quality
- Convert image format type
- Other things that shap can handle



#### Image Route (Processing)

```http
  GET /image
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filename` | `string` | **Required**. filename of image that you want to process |
| `width`    | `number` | **Optional**. width of the image |
| `height`   | `number` | **Optional**. height of the image|
| `format`   | `string` | **Optional**. file type of the image|

#### Check

```http
  GET /
```
*Return 200 if server is up and running*


## Tech Stack

**Server:** Typescript, Node, Express, Sharp

## Author 

Bertrand-code