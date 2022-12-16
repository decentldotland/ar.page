import React, { useState } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import MainNextButton from '../buttons/MainNextButton'
import UserBackButton from '../buttons/UserBackButton'
import UserNextButton from '../buttons/UserNextButton'
import { Divider } from '../user/components/reusables'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const inputContainer = 'w-8/12 md:w-9/12 text-[#8E8E8F] bg-transparent border border-b border-x-0 border-t-0  outline-none bg-slate-100 h-10 rounded-md p-[5px] shadow-sm';
const subheaderInput = 'text-[15px] font-semibold text-left text-[#8e8e8f] w-4/12 md:w-3/12';
const errorInput = 'text-[12px] text-red-300 block flex text-center justify-center'
interface Props { 
  loading: boolean
}

const SignupSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  website: Yup.string().url("Enter Full Url"),
  github: Yup.string()
    .matches(/https:\/\/github\.com\//, "Enter a Valid GitHub Url"),
  twitter: Yup.string()
    .matches(/https:\/\/twitter\.com\//, "Enter a Valid Twitter Url"),
  instagram: Yup.string()
    .matches(/https:\/\/instagram\.com\//, "Enter a Valid Instagram Url"),
  telegram: Yup.string()
    .matches(/https:\/\/t\.me\//, "Enter a Valid Telegram Url"),
});

function EditProfilePage({loading}: Props) {

  const [newChanges, setNewChanges] = useState(false)

  return (
    <section className='md:relative md:top-32 relative h-screen flex flex-col sm:w-[440px]  md:w-[600px] px-5'>
        <div className='flex items-center justify-between mt-10 '>
            <UserBackButton />
            <p className='text-sm text-center font-bold '>Edit your profile</p>
            <UserNextButton />
        </div>
        <Divider />
        {/* Coverpage  */}
        <div>
          <div className="rounded-lg w-full h-[135px] bg-[#edecec] flex items-center justify-center">
            <MdOutlineAddPhotoAlternate size={24} color={"#6a6b6a"} />
          </div>
          {/* Avatar */}
          <div className="border-4 left-[17px] bottom-[50px] border-white relative  rounded-full w-[100px] h-[100px] bg-[#edecec] flex items-center justify-center">
            <MdOutlineAddPhotoAlternate size={24} color={"#6a6b6a"} />
          </div>
        </div>

        <section className='relative bottom-5 '>
          <Formik
            initialValues={{ nickname: '', bio: '',
                             github: '', website: '',
                             instagram: '', telegram: '',
                              twitter: '' 
                            }}
            //@ts-ignore
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //Right here is where you grab the data 
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
          {({ isSubmitting, errors, validateForm }) => (
            <Form>
              <ul className='space-y-6'>
                <p className="text-sm font-bold text-left">About you</p>
                <li >
                  <div className='justify-between flex items-center'>
                    <p className={subheaderInput}>Nickname</p>
                    <Field type="text" name="nickname" className={inputContainer}/>
                  </div>
                  <p className={errorInput}>{errors.nickname}</p>
                </li>
                <li >
                  <div className='space-y-2 '>
                    <p className={subheaderInput}>Bio</p>
                    <Field name="bio">
                      {({field}:{field:any}) => {
                        return (
                          <textarea id="txtid" rows={4} cols={50} maxLength={250} name="bio" value={field.value}
                            className='text-[#8E8E8F] w-full bg-transparent border border-b border-x-0
                                       border-t-0 outline-none bg-slate-100 rounded-md p-[5px] shadow-sm'
                          >
                          </textarea>
                        );
                    }}
                    </Field>
                  </div>
                </li>
                <p className="text-sm font-bold text-left mt-5">Social Accounts</p>
                <li >
                  <div className='flex items-center'>
                    <p className={subheaderInput}>Github</p>
                    <Field type="text" name="github" className={inputContainer}/>
                  </div>
                  <p className={errorInput}>{errors.github}</p>
                </li>
                <li >
                  <div className='justify-between flex items-center'>
                    <p className={subheaderInput}>Website</p>
                    <Field type="text" name="website" className={inputContainer}/> 
                  </div>
                  <p className={errorInput}>{errors.website}</p>
                </li>
                <li >
                  <div className='justify-between flex items-center'>
                    <p className={subheaderInput}>Instagram</p>
                    <Field type="text" name="instagram" className={inputContainer}/>  
                  </div>
                  <p className={errorInput}>{errors.instagram}</p>
                </li>
                <li>
                  <div className='justify-between flex items-center'>
                    <p className={subheaderInput}>Telegram</p>
                    <Field type="text" name="telegram" className={inputContainer}/> 
                  </div>
                  <p className={errorInput}>{errors.telegram}</p>
                </li>
                <li >
                  <div className='justify-between flex items-center'>
                    <p className={subheaderInput}>Twitter</p>
                    <Field type="text" name="twitter" className={inputContainer}/> 
                  </div>
                  <p className={errorInput}>{errors.twitter}</p>
                </li>
              </ul>
              <div>
                <span>
                  <MainNextButton 
                    btnName='Save'
                    disabled={isSubmitting}
                    className="mb-4"
                  />
                </span>
              </div>
            </Form>
          )}
          </Formik>
        </section>
        <div className='relative'>
          {/* onclick save this  */}

        </div>
    </section>
  )
}
//<input type="text" placeholder='' name="nickname" className={inputContainer}/>
export default EditProfilePage;