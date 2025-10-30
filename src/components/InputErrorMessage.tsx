interface IProps{
    msg: undefined | string;
}

const InputErrorMessage = ({msg} : IProps) => {
    return(
        msg ? <span className="text-red-500 text-sm mt-1">{msg}</span> : null
    )

}

export default InputErrorMessage;
