import validationsUtility from "../utilities/Validations.uility";

export default function install(Vue) {
  Object.defineProperties(Vue.prototype, {
    $validator: {
      get() {
        return validationsUtility;
      },
    },
  });
}
