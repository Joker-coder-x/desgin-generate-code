export type UploaderAdapter = (...args: any) => any;

export interface IValidator {
  errMsg: string;
  validator: (...args: any) => boolean | Promise<boolean>;
}

export interface IValidatorError {
  errMsg: string;  
}

export async function baseUploader (
  uploaderAdapter: UploaderAdapter,
  validators: IValidator[], 
  file: File 
): Promise<any> {
  let errMsg = '';

  for (let i = 0, l = validators.length; i < l; i ++) {
    const v = validators[i];
    if (!await v.validator(file)) {
      errMsg = v.errMsg;
    }
  }

  if (errMsg) {
    return Promise.reject(<IValidatorError>{ errMsg });
  }

  return await uploaderAdapter(file);
}