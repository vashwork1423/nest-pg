import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class ProxyService {
  private readonly agent;

  constructor() {
    this.agent = new HttpsProxyAgent('http://jtzhwqur:jnf0t0n2tecg@45.196.48.9:5435');
  }

  async get(url: string) {
    return axios.get(url, { httpsAgent: this.agent });
  }
}
