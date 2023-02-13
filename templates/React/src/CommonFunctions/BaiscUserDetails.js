



export default function BasicUserInfo(props)
{
    const state=useState({
    })
    const dispatch = useDispatch();
    // console.log(status)
        return (
            <>

            <button onClick={ev=>{dispatch(Check_Auth(false))}}>
                hello from Avagtar nnnddddd
            </button>
            </>
        );

}
