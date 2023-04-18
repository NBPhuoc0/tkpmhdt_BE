
# THIẾT KẾ PHẦM MỀM HƯỚNG ĐỐI TƯỢNG - NHÓM 4


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
DB_HOST="localhost"
DB_USER="{username}"
DB_PASS="{password}"
DB_NAME="{database name}"
PORT = 3000
```


## Deployment

Install dependencies

```bash
  npm install
```

To deploy this project run

```bash
  npm run dev
```

## API Reference

chưa làm kịp :v

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

