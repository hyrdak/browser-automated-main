declare global {
  interface Window {
    gtag: any
  }
}

const emitEvent = (event_name: string) => {
  try {
    if (process.env.NEXT_PUBLIC_CURRENT_ENV === 'production' && window.gtag) {
      window.gtag('event', event_name, {
        count: 1,
      })
    }
  } catch (e) {
    console.log(`gtag is not loaded or ${event_name} is not tracked`)
  }
}

export const loadHomePageTrack = () => {
  emitEvent('load_home_page')
}

export const clickContactUsTrack = () => {
  emitEvent('contact_us')
}

export const clickSuggestLoanTrack = () => {
  emitEvent('suggest_loan')
}

export const clickLoginButtonTrack = () => {
  emitEvent('login_click')
}

export const clickJoinNowTrack = () => {
  emitEvent('join_now_click')
}

export const clickSignUpNowTrack = () => {
  emitEvent('sign_up_now_click')
}

export const sendContactTrack = () => {
  emitEvent('send_contact_click')
}

export const clickFunderDetailTrack = () => {
  emitEvent('funder_detail_click')
}

export const clickFunderDetaiJoinNowTrack = () => {
  emitEvent('funder_detail_join_now_click')
}

export const clickWorkingCapDetailTrack = () => {
  emitEvent('working_cap_detail_click')
}

export const clickWorkingCapDetailJoinNowTrack = () => {
  emitEvent('working_cap_detail_join_now_click')
}

export const clickSCFDetailTrack = () => {
  emitEvent('scf_detail_click')
}

export const clickSCFDetailJoinNowTrack = () => {
  emitEvent('scf_detail_join_now_click')
}

export const loadPreRegisterPageTrack = () => {
  emitEvent('load_pre_register_page')
}

export const loadPreRegisterResultPageTrack = () => {
  emitEvent('load_pre_register_result_page')
}

export const clickNextPreRegisterResultPageTrack = () => {
  emitEvent('click_next_pre_register_result_page')
}

export const clickBackPreRegisterResultPageTrack = () => {
  emitEvent('click_back_load_pre_register_result_page')
}

export const clickNextBttPreRegisterPageTrack = () => {
  emitEvent('click_next_btt_pre_register_page')
}

export const loadRegisterPageTrack = () => {
  emitEvent('load_register_page')
}

export const clickNextBttRegisterPageTrack = () => {
  emitEvent('click_next_btt_register_page')
}

export const loadConfirmOtpRegisterPageTrack = () => {
  emitEvent('load_verify_otp_register_page')
}

export const clickNextConfirmOtpRegisterPageTrack = () => {
  emitEvent('click_next_verify_otp_register_page')
}

export const firstLoadAuthRegister = () => {
  emitEvent('first_load_auth_register')
}

export const clickFirstNopHoSoThamGia = () => {
  emitEvent('click_first_NopHoSoThamGia')
}

export const loadStep1ApplicationTrack = () => {
  emitEvent('load_step1_application')
}

export const loadWait4ResultApplicationTrack = () => {
  emitEvent('load_Wait4Result_application')
}

export const loadStep2ApplicationTrack = () => {
  emitEvent('load_step2_application')
}

export const loadStep3ApplicationTrack = () => {
  emitEvent('load_step3_application')
}

export const loadStep4ApplicationTrack = () => {
  emitEvent('load_step4_application')
}
