import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
declare var com: any;
const StartAppSDK = com.startapp.android.publish.adsCommon.StartAppSDK;
export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    let self = this;
    // this.message = Utils.SUCCESS_MSG();
      setTimeout(function() {
          self.greet();
      }, 1000);

  }

  public greet() {

          console.log('----------------------');
          console.log('start app sdk');
          console.log('----------------------');
          StartAppSDK.init(app.android.foregroundActivity, "200315049", true);

          // Get the Main relative layout of the entire activity
          var utils = require("utils/utils");
          var context = utils.ad.getApplicationContext(); // get a reference to the application context in Android

        let mainLayout = new android.widget.RelativeLayout(app.android.foregroundActivity);
          // Define StartApp Banner
          let startAppBanner = new com.startapp.android.publish.ads.banner.Banner(context);
          let bannerParameters =
              new android.widget.RelativeLayout.LayoutParams(
                  android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
                  android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
          bannerParameters.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
          bannerParameters.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
          // Add to main Layout
          mainLayout.addView(startAppBanner, bannerParameters);
          let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;
        return msg;
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}
