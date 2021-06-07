import styled  from 'styled-components'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {LoaderSpinner} from '../LoaderSpinner'
import {ButtonPrimary} from '../Buttons'
import {FormCard,Form,  UserEmailInput,ErrorServerMessage} from './SingupForm'
import forgotPasswordAPI from '../../API/forgotPasswordAPI'

const Modal = styled.section` 
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
padding:15px;
background:#0000002b;
display: ${(props)=>(props.isModalOpened === true ? "flex" : "none")};
z-index:1000;
align-items:center;
transition: all 0.5s esase;
& > article{
  margin-top:60px;
background:${props=> props.theme.darckYellow};
}
& > article form p {
    padding: 0 16px 15px;
    color: white;
    text-align: initial;
    font-weight: 600;
}
& > article form h2 {
    margin: 0 0 15px;
    font-size: 40px;
}
`
const CloseModalButton = styled.button`
    padding: 0 4px 1px 4px;
    margin: 8px 8px 0 auto;
    cursor: pointer;
    font-weight: 600;
    border-radius: 5px;
    outline: transparent;
    transform: scale(1.2);
    background: #e83c2e;
    color: #ffffff;
    border: 1px solid #ffffff;
}
`
export default function ForgotPasswordModal({setIsModalOpened,isModalOpened}){

const [isFormLoading,setIsFormLoading]= useState(false)
const [serverError, setServerError] = useState("")

  const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});

 async function onSubmit(data,e) {
    
const info ={
email:e.target.userEmail.value,
}

await forgotPasswordAPI({
setServerError,
info,
setIsFormLoading,
setIsModalOpened
})


  }
return(
  <Modal isModalOpened={isModalOpened}>

<FormCard>
      <CloseModalButton onClick={ () => setIsModalOpened(false)}>x</CloseModalButton>
  <Form onSubmit={handleSubmit(onSubmit)}>
    <h2>📬</h2>
    <p>Igresa tu email y se te será enviado un link  válido por los siguientes 10 minutos para que puedas restaurar contraseña.</p>

    <UserEmailInput errors={errors} register={register}/>

  <ErrorServerMessage >{serverError}</ErrorServerMessage >
      


 <ButtonPrimary as="input" type="submit" value="Enviar"/>
     {(isFormLoading) && <LoaderSpinner small /> }
  </Form>
</FormCard>
</Modal>
);

}