# SERVER

-   All routes respond with a JSON.
-   If an error occurs, the response contains only one field of error.
-   If successfull, the response is specified below.
-   Only two roles are valid - "Teacher" and "Student"

## AUTHENTICATION ENDPOINTS

### SIGN UP

-   Type : POST
-   Path : /auth/signup </br>
-   Request :

```
{
    username: String,
    email: String,
    password: String,
    role: String
}
```

-   Response :

```
{
    user : {
        username: String,
        email: String,
        role: String
    }
}
```

### SIGN IN

-   Type : POST
-   Path : /auth/signin </br>
-   Request:

```
{
    email: String,
    password: String
}
```

-   Response:

```
{
    user:{
        username: String,
        email: String,
        role: String
    }
}
```

### LOGOUT

-   Type : GET
-   Path : /auth/logout </br>
-   Response:

```
{
    success : String
}
```

### GOOGLE LOGIN REQUEST

-   Type : GET
-   Path : /auth/google/login </br>
-   Response:

```
{
    url : URL   // to be redirected to for consent
}
```

### GOOGLE CALLBACK

-   Type : GET
-   Path : /auth/google/callback </br>
-   Response:

```
{
    status: Number, // Determines if user exists in the database
    user:{
        email: String,
        username: String,
        role: String, // when status = 1
        picture: URL // when status = 0
    },
    redirect : URL // when status = 0
}
```

### GOOGLE SIGNUP REQUEST AFTER CALLBACK

-   Type : POST
-   Path : /auth/google/signup </br>
-   Request:

```
{
    user: {
        username: String,
        email: String,
        role: String
    }
}
```

-   Response = Request

## CLASS ENDPOINTS

### GET ALL CLASSES

-   Type : GET
-   Path : /class/ </br>
-   Response :

```
{
    classes : [{
        _id: ObjectID,
        title: String,
        subjectCode: String,
        books: [{ String }],
        link: String,
        admin: ObjectID,
        students: [{
            user: Email,
            points: Number,
        }],
    }]
}
```

### GET CLASS BY ID

-   Type : GET
-   Path : /class/:id </br>
-   Response :

```
{
    {
        _id: ObjectID,
        title: String,
        subjectCode: String,
        books: [{ String }],
        link: String,
        admin: ObjectID,
        students: [{
            user: Email,
            points: Number,
        }],
    }
}
```

### CREATE A NEW CLASS

-   Type : POST
-   Path : /class/ </br>
-   Request :

```
{
    title: String,
    subjectCode: String,
    books: [{ String }],
    link: String,
    students: [{
        user: Email,
        points: Number,
    }],
}
```

-   Response :

```
{
    success : String
}
```

### UPDATE AN EXISTING CLASS

-   Type : PATCH
-   Path : /class/:id </br>
-   Request :

```
{
    title: String,
    subjectCode: String,
    books: [{ String }],
    link: String,
    students: [{
        user: Email,
        points: Number,
    }],
}
```

-   Response :

```
{
    success : String
}
```

### JOIN AN EXISTING CLASS

-   Type : PATCH
-   Path : /class/join/:id </br>
-   Response :

```
{
    success : String
}
```

### UNENROLL FROM AN EXISTING CLASS

-   Type : PATCH
-   Path : /class/unenroll/:id </br>
-   Response :

```
{
    success : String
}
```

### DELETE AN EXISTING CLASS

-   Type : DELETE
-   Path : /class/:id </br>
-   Response :

```
{
    success : String
}
```

## CLASS POSTS ENDPOINTS

### GET ALL POSTS OF A CLASS

-   Type : GET
-   Path : /class/:id/posts </br>
-   Response :

```
{
    posts : {
        title: String,
        content: String,
        author: ObjectID,
        classID: ObjectID
    }
}
```

### CREATE A POST IN A CLASS

-   Type : POST
-   Path : /class/:id/posts </br>
-   Request :

```
{
    title: String,
    content: String,
}
```

-   Response :

```
{
    success: String
}
```

### UPDATE A POST IN A CLASS

-   Type : PATCH
-   Path : /posts/:id </br>
-   Request :

```
{
    title: String,
    content: String,
}
```

-   Response :

```
{
    success: String
}
```

## ASSIGNMENT ENDPOINTS

### GET ALL ASSIGNMENTS IN A CLASS

-   Type : GET
-   Path : /class/:id/assign </br>
-   Response :

```
{
    assign:[{
        title: String,,
        questions: [
            {
                question: String,
                options: [String],
                correct: String,
                points: Number, // default: 1
            },
        ],
        submissions: [
            {
                user: String,
                points: Number, // default: 0
                time: Date, // default: Date.now
            },
        ],
        classID: ObjectID,
        due: Date,
    }]
}
```

### GET ASSIGNMENT BY ID

-   Type : GET
-   Path : /assign/:id </br>
-   Response :

```
{
    title: String,,
    questions: [
        {
            question: String,
            options: [String],
            correct: String,
            points: Number, // default: 1
        },
    ],
    submissions: [
        {
            user: String,
            points: Number, // default: 0
            time: Date, // default: Date.now
        },
    ],
    classID: ObjectID,
    due: Date,
}
```

### CREATE ASSIGNMENT IN A CLASS

-   Type : POST
-   Path : /class/:id/assign </br>
-   Request :

```
{
    title: String,,
    questions: [
        {
            question: String,
            options: [String],
            correct: String,
            points: Number, // default: 1
        },
    ],
    due: Date,
}
```

-   Response :

```
{
    success : String
}
```

### UPDATE ASSIGNMENT BY ID

-   Type : PATCH
-   Path : /assign/:id </br>
-   Request :

```
{
    title: String,,
    questions: [
        {
            question: String,
            options: [String],
            correct: String,
            points: Number, // default: 1
        },
    ],
    due: Date,
}
```

-   Response :

```
{
    success : String
}
```

### SUBMIT ASSIGNMENT BY ID

-   Type : PATCH
-   Path : /assign/:id/submit </br>
-   Request :

```
{
    subs:[String]
}
```

-   Response :

```
{
    success : String
}
```
