import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchClients } from "../redux/actions/clients";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { Clients } from "../components/ClientsComponent";
import ClientDetail from "../components/ClientDetail";
import JobDetail from "./JobDetail";

const mapStateToProps = (state) => {
  return {
    clients: state.clients,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchClients: () => dispatch(fetchClients()),
});

class Main extends PureComponent {
  componentWillMount() {
    this.props.fetchClients();
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Clients
                rows={this.props.clients.clients}
                loading={this.props.clients.isLoading}
              ></Clients>
            )}
          ></Route>
          <Route
            exact
            path="/client_details/:id"
            render={() => (
              <ClientDetail
                rows={this.props.clients.clients}
                loading={this.props.clients.isLoading}
              ></ClientDetail>
            )}
          ></Route>
          <Route
            exact
            path="/job_details/:client_id/:job_id"
            render={() => (
              <JobDetail
                rows={this.props.clients.clients}
                loading={this.props.clients.isLoading}
              ></JobDetail>
            )}
          ></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
