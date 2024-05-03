import axios from 'axios';

import { createClient,SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseAPIUrl = 'https://ismbrwqkcootieaguzwa.supabase.co/rest/v1/';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';

const supabase : SupabaseClient = createClient(supabaseUrl, supabaseAPIKey);

const axiosInstance = axios.create({
  baseURL: supabaseAPIUrl,
  headers: {
    'apikey': supabaseAPIKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

let getID:number = 0;

const databaseService = {
  
  //table
  async getNodes() {
    try {
      const response = await axiosInstance.get('/Nodes');
      
return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getType() {
    try {
      const response = await axiosInstance.get('/Type');
      
return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getKind() {
    try {
      const response = await axiosInstance.get('/Kind');
      
return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getJsonOptions() {
    try {
      const response = await axiosInstance.get('/JsonOptions');
      
return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async getWorkflows() {
    try {
      const response = await axiosInstance.get('/Workflows');
      
return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  //Nodes
  async getNodesList() {
    try {
      const { data, error } = await supabase
      .rpc('getnodes');
      getID = data.length+1;
      if (error) console.error(error)
      else return data;

      // const nodes = await this.getNodes();
      // const types = await this.getType();
      // const kinds = await this.getKind();
      // const jsonOptions = await this.getJsonOptions();
      // const nodes_list: any = [];
      // const runtime = (id: any) => { id > getID && (getID = id); };
      // nodes.forEach((node_item:any) => {
      //   runtime(node_item.id);
      //   const kind = kinds.find((item:any) => item.id === node_item.id_kind);
      //   const type = types.find((item:any) => item.id === node_item.id_type);
      //   const json_option = jsonOptions.find((item:any) => item.id === node_item.id);
      //   if (kind && type && json_option) {
      //     nodes_list.push({
      //       id: node_item.id,
      //       name: node_item.name,
      //       kind: kind.name,
      //       type: type.name,
      //       json_options: json_option.name,
      //     });
      //   }
      // });
      // return nodes_list;
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //getNodeByID
  async getNodeByID(id: any) {
    try {
      const { data, error } = await supabase
      .rpc('getnodesbyid', {
        e:id
      })
      if (error) {
        console.error('Error:', error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  },

  //add Node
  async addNode(name:any, id_kind:any, id_type:any, json_option:any) {
    try {
      const { data, error } = await supabase
        .from('Nodes')
        .insert([
          { id: getID, name: name, id_kind: id_kind, id_type: id_type },
        ])
        .select();
      if (error) {
        console.error('Error:', error.message);
      } else{
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    try {
      const { data, error } = await supabase
        .from('JsonOptions')
        .insert([
          { id: getID, name_jsonoptions : json_option },
        ])
        .select();
      if (error) {
        console.error('Error:', error.message);
      } else{
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
    
return true;
  },

  //user
  async sign_in(email: any, password: any) {
    try{
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if(error){
        return error;
      }
      else {
        return true;
      }
    } catch (error:any) {
      console.error('Login error:', error.message);
      throw new Error('Login failed');
    }
  //   try {
  //     const { user, error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password,
  //     });
  
  //     if (error) {
  //       console.error('Login error:', error.message);
  //       throw new Error('Login failed');
  //     }
  
  //     // Retrieve the current user and session
  //     const currentUser = supabase.auth.user();
  //     const currentSession = supabase.auth.session();
  
  //     if (currentUser && currentSession) {
  //       localStorage.setItem('access_token', currentSession.access_token);
  //       localStorage.setItem('refresh_token', currentSession.refresh_token);
  //     }
    // } catch (error) {
    //   console.error('Login error:', error.message);
    //   throw new Error('Login failed');
    // }
  },   
  async sign_up() {
    
  },
  async sign_out() {
    
  }
};

export default databaseService;