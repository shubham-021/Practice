export default function({children} : {
    children : React.ReactNode
}){
    return <div>
        <div className="border-b border-t text-center">
            Sign In to get 20% discount on all products
        </div>
        {children}
    </div>
}

// 2.
// global layout.tsx will be applied first to all the pages , then the local layout.tsx will be 
// applied on all pages of route/folder signin

// 3.
// but what if you want this banner to be all the pages of signin as well as signup
// you can put both signin and signup in a single folder , like auth , and give it the
// layout.tsx file for that folder
// but in this case , the url changes from /signin and /singup to auth/signin and auth/signup
// what if we dont want the hitpoint to change
// we can create auth folder as ( auth ) {with brackets} , this will ignore the auth path and you
// won't have to use /auth/sign , rather you can do /sign

// 4.
// components directory
// you should put all your component in a components directory and use them in the app routes rather
// than shoving everything in the route handler

// Steps :
//    # Create a new folder called components in the root of the project
//    # Add a new component there called Signin.tsx
//    # Move the signin logic there
//    # Render the Signin component in app/(auth)signin/page.tsx
