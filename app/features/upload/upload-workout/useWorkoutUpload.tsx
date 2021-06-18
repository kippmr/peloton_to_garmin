import React from 'react';
import Axios from 'axios';
import { CredentialsProperties } from '../../../db/schemas/credentials';
import { remote } from 'electron';

const useWorkoutUpload = async (
  tcxString: string,
  credentials: CredentialsProperties[]
) => {
  console.log(tcxString);

  const garminCredential = credentials.find(
    (credential) => credential.provider == 'Garmin'
  );

  if (garminCredential) {
    const session = remote.session;

    const ssoHostResponse = await Axios.get(
      'https://connect.garmin.com/modern/auth/hostname'
    );

    const ripCsrfResponse = await Axios.get(
      'https://sso.garmin.com/sso/login' +
        '?service=https://connect.garmin.com/modern/&webhost=https://connect.garmin.com/modern/&source=https://connect.garmin.com/signin/&redirectAfterAccountLoginUrl=https://connect.garmin.com/modern/&redirectAfterAccountCreationUrl=https://connect.garmin.com/modern/&gauthHost=https://sso.garmin.com/sso&locale=en_US&id=gauth-widget&cssUrl=https://connect.garmin.com/gauth-custom-v1.2-min.css&privacyStatementUrl=https://www.garmin.com/en-US/privacy/connect/&clientId=GarminConnect&rememberMeShown=true&rememberMeChecked=false&createAccountShown=true&openCreateAccount=false&displayNameShown=false&consumeServiceTicket=false&initialFocus=true&embedWidget=false&generateExtraServiceTicket=true&generateTwoExtraServiceTickets=true&generateNoServiceTicket=false&globalOptInShown=true&globalOptInChecked=false&mobile=false&connectLegalTerms=true&showTermsOfUse=false&showPrivacyPolicy=false&showConnectLegalAge=false&locationPromptShown=true&showPassword=true&useCustomHeader=false&mfaRequired=false&performMFACheck=false&rememberMyBrowserShown=false&rememberMyBrowserChecked=false',
      { host: ssoHostResponse.data.host }
    );

    const csrf = ripCsrfResponse.data.match(/_csrf"\s*value="(.*?)"/);
    if (!csrf || csrf.length < 1) {
      throw 'No csrf found';
    }

    console.log(csrf, ripCsrfResponse);

    const loginResponse = await Axios.post(
      'https://sso.garmin.com/sso/login' +
        '?service=https://connect.garmin.com/modern/&webhost=https://connect.garmin.com/modern/&source=https://connect.garmin.com/signin/&redirectAfterAccountLoginUrl=https://connect.garmin.com/modern/&redirectAfterAccountCreationUrl=https://connect.garmin.com/modern/&gauthHost=https://sso.garmin.com/sso&locale=en_US&id=gauth-widget&cssUrl=https://connect.garmin.com/gauth-custom-v1.2-min.css&privacyStatementUrl=https://www.garmin.com/en-US/privacy/connect/&clientId=GarminConnect&rememberMeShown=true&rememberMeChecked=false&createAccountShown=true&openCreateAccount=false&displayNameShown=false&consumeServiceTicket=false&initialFocus=true&embedWidget=false&generateExtraServiceTicket=true&generateTwoExtraServiceTickets=true&generateNoServiceTicket=false&globalOptInShown=true&globalOptInChecked=false&mobile=false&connectLegalTerms=true&showTermsOfUse=false&showPrivacyPolicy=false&showConnectLegalAge=false&locationPromptShown=true&showPassword=true&useCustomHeader=false&mfaRequired=false&performMFACheck=false&rememberMyBrowserShown=false&rememberMyBrowserChecked=false',
      {
        embed: 'false',
        username: garminCredential.username,
        password: garminCredential.password,
        _csrf: csrf,
      },
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'fr,en-US;q=0.7,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          Origin: 'https://sso.garmin.com',
          DNT: '1',
          Connection: 'keep-alive',
          Referer: ripCsrfResponse.config.url,
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'iframe',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-User': '?1',
          TE: 'Trailers',
        },
      }
    );
    console.log(loginResponse);
  }
};

export default useWorkoutUpload;
