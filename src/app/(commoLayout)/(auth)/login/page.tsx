import LoginForm from "@/components/Auth/login/LoginForm";

const Login = async({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
   const {redirect} = await searchParams || {};
   // console.log("Redirect param in login page:", redirect);
   return (
      <div>
         <LoginForm redirect={redirect} />
      </div>
   );
};

export default Login;
