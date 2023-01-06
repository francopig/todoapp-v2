import { Todo } from "../todos/models/todo.model";

//Enumeración
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Tarea 1'),
        new Todo('Tarea 2'),
    ],
    filter: Filters.All,
}

const initStore = () => {

    loadStore();
    console.log('InitStore 🥑');
};

const loadStore = () =>{
    if( !localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse( localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
     localStorage.setItem('state', JSON.stringify(state));

}


/**
 *  Muestra los todo's que le indiquemos por filtro
 * @param {Filters} filter enum con los filtros
 * @returns 
 */
const getTodos = ( filter = Filters.All) => {
    
    switch( filter ){
        case Filters.All:
            return [...state.todos]; //spread para retornar un array con todos
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

        default:
            throw new Error(`option ${ filter } is not valid`);
    }

}

/**
 * Agrega el todo que llega por parámetro
 * @param {String} description 
 */
const addTodo = ( description ) =>{
    if( !description ) throw new Error('Description is required');

    state.todos.push( new Todo(description) );
    saveStateToLocalStorage();
}

/**
 * Cambia el estado done del todo.
 * @param {String} todoId identifier
 * @return todo con el estado cambiado
 */
const toggleTodo = ( todoId ) =>{
    
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId){
            todo.done = !todo.done; //Le asigno el opuesto
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * Elimina el todo's indicado
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    if( !todoId )throw new Error('TodoId is required');

    //Regreso todos los todo's con id != al que quiero eliminar
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateToLocalStorage();
}


/**
 * Elimina todos los todo's que estén completados
 */
const deleteCompleted = () => {
    
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();
} 

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
   
    state.filter = newFilter;
    saveStateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
