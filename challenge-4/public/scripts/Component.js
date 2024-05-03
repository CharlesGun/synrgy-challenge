class Component {
    constructor(props) {
        if (this.constructor === Component) {
            throw new Error("Cannot instantiate an object of Component");
        }
    }

    render() {
        // Override this method in the child class
    }
}