
import PropTypes from 'prop-types';

function Button({text, className, onClick}) {
    return (
        <button  
        onClick={onClick}
        className={" rounded-lg font-mono px-4 py-2 border-2 border-transparent  transition duration-300  focus:ring-2 " + className}>
          {text}
        </button>
    )
    
}

  Button.ReactPropTypes= {
      text: PropTypes.string
  }

   export default Button
