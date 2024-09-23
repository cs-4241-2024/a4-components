

function ObjectFormInput({field,object,setObject,css,type,placeholder,id}) {
    return <input value={object[field]} className={css} type={type} placeholder={placeholder} id={id}
                  onChange={(e) => {
                      let edit = structuredClone(object)
                      edit[field] = e.target.value
                      setObject(edit)
                  }}></input>
}

export default ObjectFormInput