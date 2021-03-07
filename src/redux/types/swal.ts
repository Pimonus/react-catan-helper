interface SwalAction_Fire {
  type: 'SWAL::FIRE';
}
interface SwalAction_Dismiss {
  type: 'SWAL::DISMISS';
}

export type SwalAction = SwalAction_Fire | SwalAction_Dismiss;
