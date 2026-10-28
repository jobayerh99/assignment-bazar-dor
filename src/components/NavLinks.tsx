

const NavLinks = async() => {

    // category api data fetching

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();

    console.log(data);

    return (
        <div>
            
        </div>
    );
};

export default NavLinks;