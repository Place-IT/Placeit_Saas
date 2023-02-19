
export default function basicSuccess(ev,input)
{
    let a={...input.state}
    a[input.name]=ev.target.value
    input.setState(a)
}