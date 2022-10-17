// 
// const showUSer = document.getElementById('user');
// class User{
//     constructor(name, lastName, books, pets){
//         this.name = name;
//         this.lastName = lastName; 
//         this.books = books;
//         this.pets = pets;
//     }
//     getFullName(){
//         console.log(`Hola ${this.name} tu apellido es ${this.lastName}`)
//     }
//     addPet(newPet){
//         this.pets.push(newPet);
//         console.log(this.pets)
//     }
//     countPet(){
//         console.log(`Tenes ${this.pets.length} animales`);
//     }
//     addBook(name, author){
//         this.books.push({
//             name: name,
//             author: author
//         });
//         console.log(this.books)
//     }
//     getBookNames(){
//         const bookNames = this.books.map(book =>  book.name);
//         console.log(bookNames);
//     }
// }

// const user1 = new User('Lao', 'Lanus', [
//     {
//         name: 'El señor de los anillos',
//         author: 'Tolkien'
//     },
//     {
//         name: 'El principito',
//         author: 'Antoine de Saint-Exupéry '
//     },
//     {
//         name: '1984',
//         author: 'George Orwell'
//     }
// ],['India', 'Floyd', 'Alphie', 'Scooby']);

// user1.getFullName();
// user1.addPet('Lucky');
// user1.countPet();
// user1.addBook('Narnia', 'C.S Lewis');
// user1.getBookNames();

const message = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve(console.log('Soy un mensaje'));
    }, 2000);
});

const showMessage = async () => {
    console.log('Primer mensaje');
    await message;
    console.log('Voy despues del segundo mensaje');
}
showMessage();

