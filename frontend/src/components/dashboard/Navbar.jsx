export function Navbar(){
    return(
        <div className="flex items-center justify-between p-8 shadow-xl">
            <div className="text-3xl font-extrabold">  
                Payments App
            </div>
            <div className="flex items-center justify-center gap-4">
                <div>
                    Hello, User
                </div>
                <div className="bg-black rounded-full text-white w-10 h-10 p-2 text-center">
                    <div>U</div>
                </div>
            </div>
        </div>
    )

}