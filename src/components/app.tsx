import { TwoThirdsWidth } from "../layout/containers";
import { SelectFile } from "./selectFile";
import { Link } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import { RotaApi } from "../utils/RotaApi";
import { Rota } from "../utils/Rota";
import CalendarComponent from "./calendar";

export const Spacer = styled.div`
  display: block;
  height: 50px;
`;

const UploadWrapper = styled.div`
  display: flex;
`;

const LinkToExample = styled.div`
  margin: auto;
  margin-left: 20px;
  font-size: 0.9em;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.9em;
  padding-top: 10px;
`;

type AppProps = {
  api: RotaApi;
};

type AppState = {
  rota?: Rota;
  error?: boolean;
};

const App: React.FunctionComponent<AppProps> = ({ api }) => {
  const [{ rota, error }, setState] = useState<AppState>({});
  if (rota) {
    return (
      <div>
        <h2>Your schedule</h2>
        <CalendarComponent rota={rota!!} />
        <Spacer />
        <a href="/" onClick={() => setState({})}>
          Go back to the homepage
        </a>
      </div>
    );
  }

  const errorDisplay = error && (
    <ErrorText>
      Sorry, we had trouble understanding this rota - try a different file or
      get in touch.
    </ErrorText>
  );

  return (
    <TwoThirdsWidth>
      <h1>Taking some of the stress out of healthcare rotas</h1>
      <p>
        A tool that helps healthcare workers get a simple version of their work
        schedule. Knowing when you are working should be easy.
      </p>
      <UploadWrapper>
        <SelectFile
          onUploadSuccess={(rota: Rota) => setState({ rota })}
          onUploadError={() => setState({ error: true })}
          rotaApi={api}
        />
        <LinkToExample>
          or <Link to="/schedule-example">see an example</Link>
        </LinkToExample>
      </UploadWrapper>
      {errorDisplay}
      <Spacer />
      <p>
        This is an open-source project. If you think you can help, get in touch
        or head over to the GitHub page.
      </p>
    </TwoThirdsWidth>
  );
};

export default App;
